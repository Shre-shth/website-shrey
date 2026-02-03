import React, { useRef } from 'react';
import useCanvasCursor from '../hooks/use-canvasCursor';

const CanvasCursor = () => {
    const canvasRef = useRef(null);
    useCanvasCursor(canvasRef);

    return <canvas ref={canvasRef} className='pointer-events-none fixed inset-0 z-50' id='canvas' />;
};

export default CanvasCursor;
