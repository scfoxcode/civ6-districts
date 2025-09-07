<script lang="ts">

    import { droppable } from '@thisux/sveltednd';

    interface TileSlotProps {
        index: number;
        size?: number;
        fill?: string;
        over_fill?: string;
        stroke?: string;
        img_src?: string | null;
        img_size?: number;
        bonus: number;
        on_click: () => void;
        on_drop(tile: TileType): void;
    };

    let {
        index,
        size = 164,
        fill = "#ccc",
        over_fill = "#cfc",
        stroke = "black",
        img_src,
        img_size = 1.0, // image is 50% of hex width
        bonus,
        on_click,
        on_drop,
    }: TileSlotProps = $props();

    const diag_h = 0.25; // 0.2887 0.5size*tan(pi/6) // ugh, they aren't regular hexagons
    const x_pad = $derived(0.07 * size); // the src images have some left and right padding

    const h = $derived(size * 1.0); // hex height
    const points = $derived([
        [size * 0.5, 0.0],
        [size - x_pad, h * diag_h],
        [size - x_pad, h * diag_h * 3.0],
        [size * 0.5, h],
        [x_pad, h * diag_h * 3.0],
        [x_pad, h * diag_h],
    ]
        .map(([x, y]) => `${x},${y}`)
        .join(" ")
    );

    const img_w = $derived(size * img_size);
    const img_h = $derived(img_w); // square image
    const img_x = $derived((size - img_w) / 2);
    const img_y = $derived((h - img_h) / 2);

    const hide_bonus = $derived(bonus < 0.1 ? " display_none" : "");

    const handle_drop = (data) => {
        on_drop(data.draggedItem.id);
    };

</script>

<div 
    use:droppable={{ container: `tile_slot_${index}`, callbacks: {onDrop: handle_drop}}}
    onclick={on_click}
    class="tile_slot"
>
    <svg
        width={size}
        height={h}
        viewBox={`0 0 ${size} ${h}`}
        style="display: block; cursor: pointer; outline-style: none;"
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
    <div class={`tile_slot_bonus_box${hide_bonus}`} >
        {`+${bonus}`}
    </div>
</div>

