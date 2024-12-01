import { ASTNode } from "../../types/ASTNode.ts";

export async function convertImagesToBase64(nodes: ASTNode[]): Promise<void> {
    const processImageNode = async (node: ASTNode): Promise<void> => {
        if (node.type === 'image' && node.attrs?.src) {
            try {
                const response = await fetch(node.attrs.src);
                const blob = await response.blob();

                const base64Image = await new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                });

                node.attrs.src = base64Image;
            } catch (error) {
                console.error('Ошибка обработки изображения:', error);
                node.attrs.src = undefined;
            }
        }

        if (node.type === "drawio" && node.attrs?.src) {
            try {
                const svgContent = await getFileContent(node.attrs.src);
                node.attrs.src = svgContent;
            } catch (error) {
                console.error(`Ошибка при загрузке SVG: ${error}`);
                node.attrs.src = undefined;
            }
        }

        if (node.content) {
            await Promise.all(node.content.map(processImageNode));
        }
    };

    await Promise.all(nodes.map(processImageNode));
}

async function getFileContent(url: string): Promise<string> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        return await response.text();
    } catch (error) {
        throw new Error(`Ошибка при загрузке файла: ${error}`);
    }
}