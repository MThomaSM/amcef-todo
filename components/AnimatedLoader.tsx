import React from 'react';

interface AnimatedLoaderProps {
    width: number;
    height: number;
}
const AnimatedLoader: React.FC<AnimatedLoaderProps> = ({width, height}) => {
    return (
        <svg
            style={{
                margin: 'auto',
                background: 'none',
                display: 'block',
                shapeRendering: 'auto',
            }}
            width={width+"px"}
            height={height+"px"}
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
        >
            <g transform="rotate(0 50 50)">
                <rect
                    x="47.5"
                    y="23"
                    rx="2.5"
                    ry="3.36"
                    width="5"
                    height="12"
                    fill="#93dbe9"
                    style={{ fill: '#97eefe' }}
                >
                    <animate
                        attributeName="opacity"
                        values="1;0"
                        keyTimes="0;1"
                        dur="1.1111111111111112s"
                        begin="-1.0317460317460319s"
                        repeatCount="indefinite"
                    />
                </rect>
            </g>
            <g transform="rotate(25.714285714285715 50 50)">
                <rect
                    x="47.5"
                    y="23"
                    rx="2.5"
                    ry="3.36"
                    width="5"
                    height="12"
                    fill="#93dbe9"
                    style={{ fill: '#186676' }}
                >
                    <animate
                        attributeName="opacity"
                        values="1;0"
                        keyTimes="0;1"
                        dur="1.1111111111111112s"
                        begin="-0.9523809523809524s"
                        repeatCount="indefinite"
                    />
                </rect>
            </g>
            <g transform="rotate(51.42857142857143 50 50)">
                <rect
                    x="47.5"
                    y="23"
                    rx="2.5"
                    ry="3.36"
                    width="5"
                    height="12"
                    fill="#93dbe9"
                    style={{ fill: '#97eefe' }}
                >
                    <animate
                        attributeName="opacity"
                        values="1;0"
                        keyTimes="0;1"
                        dur="1.1111111111111112s"
                        begin="-0.873015873015873s"
                        repeatCount="indefinite"
                    />
                </rect>
            </g>
            <g transform="rotate(77.14285714285714 50 50)">
                <rect
                    x="47.5"
                    y="23"
                    rx="2.5"
                    ry="3.36"
                    width="5"
                    height="12"
                    fill="#93dbe9"
                    style={{ fill: '#186676' }}
                >
                    <animate
                        attributeName="opacity"
                        values="1;0"
                        keyTimes="0;1"
                        dur="1.1111111111111112s"
                        begin="-0.7936507936507937s"
                        repeatCount="indefinite"
                    />
                </rect>
            </g>
            <g transform="rotate(102.85714285714286 50 50)">
                <rect
                    x="47.5"
                    y="23"
                    rx="2.5"
                    ry="3.36"
                    width="5"
                    height="12"
                    fill="#93dbe9"
                    style={{ fill: '#186676' }}
                >
                    <    animate
                        attributeName="opacity"
                        values="1;0"
                        keyTimes="0;1"
                        dur="1.1111111111111112s"
                        begin="-0.7142857142857143s"
                        repeatCount="indefinite"
                    />
                </rect>
            </g>
            <g transform="rotate(128.57142857142858 50 50)">
                <rect
                    x="47.5"
                    y="23"
                    rx="2.5"
                    ry="3.36"
                    width="5"
                    height="12"
                    fill="#93dbe9"
                    style={{ fill: '#97eefe' }}
                >
                    <animate
                        attributeName="opacity"
                        values="1;0"
                        keyTimes="0;1"
                        dur="1.1111111111111112s"
                        begin="-0.6349206349206349s"
                        repeatCount="indefinite"
                    />
                </rect>
            </g>
            <g transform="rotate(154.28571428571428 50 50)">
                <rect
                    x="47.5"
                    y="23"
                    rx="2.5"
                    ry="3.36"
                    width="5"
                    height="12"
                    fill="#93dbe9"
                    style={{ fill: '#186676' }}
                >
                    <animate
                        attributeName="opacity"
                        values="1;0"
                        keyTimes="0;1"
                        dur="1.1111111111111112s"
                        begin="-0.5555555555555556s"
                        repeatCount="indefinite"
                    />
                </rect>
            </g>
            <g transform="rotate(180 50 50)">
                <rect
                    x="47.5"
                    y="23"
                    rx="2.5"
                    ry="3.36"
                    width="5"
                    height="12"
                    fill="#93dbe9"
                    style={{ fill: '#97eefe' }}
                >
                    <animate
                        attributeName="opacity"
                        values="1;0"
                        keyTimes="0;1"
                        dur="1.1111111111111112s"
                        begin="-0.4761904761904762s"
                        repeatCount="indefinite"
                    />
                </rect>
            </g>
            <g transform="rotate(205.71428571428572 50 50)">
                <rect
                    x="47.5"
                    y="23"
                    rx="2.5"
                    ry="3.36"
                    width="5"
                    height="12"
                    fill="#93dbe9"
                    style={{ fill: '#186676' }}
                >
                    <animate
                        attributeName="opacity"
                        values="1;0"
                        keyTimes="0;1"
                        dur="1.1111111111111112s"
                        begin="-0.39682539682539686s"
                        repeatCount="indefinite"
                    />
                </rect>
            </g>
            <g transform="rotate(231.42857142857142 50 50)">
                <rect
                    x="47.5"
                    y="23"
                    rx="2.5"
                    ry="3.36"
                    width="5"
                    height="12"
                    fill="#93dbe9"
                    style={{ fill: '#97eefe' }}
                >
                    <animate
                        attributeName="opacity"
                        values="1;0"
                        keyTimes="0;1"
                        dur="1.1111111111111112s"
                        begin="-0.31746031746031744s"
                        repeatCount="indefinite"
                    />
                </rect>
            </g>
            <g transform="rotate(257.14285714285717 50 50)">
                <rect
                    x="47.5"
                    y="23"
                    rx="2.5"
                    ry="3.36"
                    width="5"
                    height="12"
                    fill="#93dbe9"
                    style={{ fill: '#186676' }}
                >
                    <animate
                        attributeName="opacity"
                        values="1;0"
                        keyTimes="0;1"
                        dur="1.1111111111111112s"
                        begin="-0.2380952380952381s"
                        repeatCount="indefinite"
                    />
                </rect>
            </g>
            <g transform="rotate(282.85714285714283 50 50)">
                <rect
                    x="47.5"
                    y="23"
                    rx="2.5"
                    ry="3.36"
                    width="5"
                    height="12"
                    fill="#93dbe9"
                    style={{ fill: '#186676' }}
                >
                    <animate
                        attributeName="opacity"
                        values="1;0"
                        keyTimes="0;1"
                        dur="1.1111111111111112s"
                        begin="-0.15873015873015872s"
                        repeatCount="indefinite"
                    />
                </rect>
            </g>
            <g transform="rotate(308.57142857142856 50 50)">
                <rect
                    x="47.5"
                    y="23"
                    rx="2.5"
                    ry="3.36"
                    width="5"
                    height="12"
                    fill="#93dbe9"
                    style={{ fill: '#97eefe' }}
                >
                    <animate
                        attributeName="opacity"
                        values="1;0"
                        keyTimes="0;1"
                        dur="1.1111111111111112s"
                        begin="-0.07936507936507936s"
                        repeatCount="indefinite"
                    />
                </rect>
            </g>
            <g transform="rotate(334.2857142857143 50 50)">
                <rect
                    x="47.5"
                    y="23"
                    rx="2.5"
                    ry="3.36"
                    width="5"
                    height="12"
                    fill="#93dbe9"
                    style={{ fill: '#186676' }}
                >
                    <animate
                        attributeName="opacity"
                        values="1;0"
                        keyTimes="0;1"
                        dur="1.1111111111111112s"
                        begin="0s"
                        repeatCount="indefinite"
                    />
                </rect>
            </g>
        </svg>
    );
}

export default AnimatedLoader;
