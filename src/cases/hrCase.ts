import {ContentCanvas} from "pdfmake/interfaces";

export function hrCase(): ContentCanvas {
    return {
        canvas: [
            {
                type: 'line',
                x1: 0,
                y1: 0,
                x2: 515.28,
                y2: 0,
                lineWidth: 1,
                lineColor: '#a4a4a4',
            },
        ],
    };
}