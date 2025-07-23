import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { Tooltip } from 'react-tooltip'

const CopyToClipboardButton: React.FC<{ textToCopy: string }> = ({ textToCopy }) => {
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const [tooltipContent, setTooltipContent] = useState('');
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const tooltipId = 'copy-btn'; // Unique ID for the tooltip

    const showDynamicTooltip = () => {
        setTooltipContent(`Copy`);
        setIsTooltipVisible(true);
    };

    const hideTooltip = () => {
        setIsTooltipVisible(false);
    };

    const handleCopy = async () => {
        try {
            await copy(textToCopy);
            setIsCopied(true);
            setTooltipContent('Copied');
            setIsTooltipVisible(true);
            setTimeout(() => {
                setIsCopied(false);
                setIsTooltipVisible(false);
                setTooltipContent('Copy');
            }, 2000)
        } catch (err) {
            console.error('Failed to copy text: ', err);
            setIsCopied(false);
        }
    };

    return (
        <div>
            <button onClick={handleCopy} data-tooltip-id={tooltipId} onMouseEnter={() => showDynamicTooltip()}
                    onMouseLeave={hideTooltip}>
                <svg onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className=" fill-[#2183ca] hover:fill-[#f4a427]" focusable="false" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                    <g>
                        <rect fill="none" height="24" width="24"></rect>
                    </g>
                    <g>
                        <path fill={isCopied ? 'grey' : isHovered ? '#f4a427' : '#2183ca'} d="M16,20H5V6H3v14c0,1.1,0.9,2,2,2h11V20z M20,16V4c0-1.1-0.9-2-2-2H9C7.9,2,7,2.9,7,4v12c0,1.1,0.9,2,2,2h9 C19.1,18,20,17.1,20,16z M18,16H9V4h9V16z" >
                        </path>
                    </g>
                    <desc id="svgDesc">Copy to Clipboard.</desc>
                </svg>
            </button>
            <Tooltip id={tooltipId} isOpen={isTooltipVisible} content={tooltipContent} />
        </div>
    );
};

export default CopyToClipboardButton;