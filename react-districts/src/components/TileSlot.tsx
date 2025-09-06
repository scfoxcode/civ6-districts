interface TileSlotProps {
  size?: number;
  fill?: string;
  stroke?: string;
  onClick?: () => void;
  img_src?: string | null;
  img_size?: number;
};

export const TileSlot: React.FC<TileSlotProps> = ({
    size = 164,
    fill = "#ccc",
    stroke = "black",
    onClick,
    img_src,
    img_size = 1.0, // image is 50% of hex width
}) => {
    const diag_h = 0.25; // 0.2887 0.5size*tan(pi/6) // ugh, they aren't regular hexagons
    const x_pad = 0.07 * size; // the src images have some left and right padding

    const h = size * 1.0; // hex height
    const points = [
        [size * 0.5, 0.0],
        [size - x_pad, h * diag_h],
        [size - x_pad, h * diag_h * 3.0],
        [size * 0.5, h],
        [x_pad, h * diag_h * 3.0],
        [x_pad, h * diag_h],
    ]
        .map(([x, y]) => `${x},${y}`)
        .join(" ");

    const img_w = size * img_size;
    const img_h = img_w; // square image
    const img_x = (size - img_w) / 2;
    const img_y = (h - img_h) / 2;

    return (
        <svg
            width={size}
            height={h}
            viewBox={`0 0 ${size} ${h}`}
            style={{ display: "block", cursor: "pointer" }}
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onClick?.();
            }}
            aria-label="Hex button"
        >
            <polygon points={points} fill={fill} stroke={stroke} strokeWidth="4" />

            <image
                href={img_src ? img_src : undefined}
                x={img_x}
                y={img_y}
                width={img_w}
                height={img_h}
                preserveAspectRatio="xMidYMid meet"
                clipPath="url(#clip)"
            />
        </svg>
    );
}
