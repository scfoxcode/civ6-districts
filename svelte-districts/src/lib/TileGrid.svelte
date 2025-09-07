<script lang="ts">
    import TileSlot from './TileSlot.svelte';
    import { calculate_bonus, tile_icon_path } from '../tiles.ts';
    import type { TileType } from '../tiles.ts';

    interface TileGridProps {
        tile_names: (TileType | null)[];
        clear_tile(index: number): void;
        set_tile(index: number, tile: (TileType | null));
    }

    let props: TileGridProps = $props();

    // Control based on browser size
    function calc_tile_size(): number {
        if (window.innerWidth > 1000) {
            return 220;
        } else if (window.innerWidth > 700) {
            return 164;
        } else {
            return 110;
        }
    }

    let tile_size = $state(calc_tile_size());
    let bonuses = $state([0, 0, 0, 0, 0, 0, 0]);

    $effect(() => {
        // Will this need a $derived? 
        const handle_resize = () => {
            tile_size = calc_tile_size();
        };

        window.addEventListener('resize', handle_resize);

        // Not sure this is right.
        // Video suggested it's called on every run of effect, which is different
        // to react's useEffect, where it's only called on unmount
        return () => {
            window.removeEventListener('resize', handle_resize);
        }
    });

    $effect(() => {
        const grid_cells = [...Array(7).keys()];
        bonuses = grid_cells.map((index) => calculate_bonus(index, props.tile_names));
    });

    const tile_data = $derived(props.tile_names.map((name) => {
        if (!name) {
            return null;
        } else {
            return {
                tile_type: name,
                thumbnail: tile_icon_path(name),
            };
        }
    }));

    const half_margin = $derived(`${tile_size / 2.0}px`);

</script>

<div class="tile_grid">
    <div class="tile_grid_inner">
        <div class="tile_grid_row" style={`margin-left: ${half_margin}`}>
            <TileSlot 
                index={0}
                img_src={tile_data[0]?.thumbnail}
                size={tile_size}
                bonus={bonuses[0]}
                on_click={() => props.clear_tile(0)}
                on_drop={(tile) => props.set_tile(0, tile)}
            />

            <TileSlot 
                index={1}
                img_src={tile_data[1]?.thumbnail}
                size={tile_size}
                bonus={bonuses[1]}
                on_click={() => props.clear_tile(1)}
                on_drop={(tile) => props.set_tile(1, tile)}
            />

        </div>
        <div class="tile_grid_row">
            <TileSlot 
                index={2}
                img_src={tile_data[2]?.thumbnail}
                size={tile_size}
                bonus={bonuses[2]}
                on_click={() => props.clear_tile(2)}
                on_drop={(tile) => props.set_tile(2, tile)}
            />
            <TileSlot 
                index={3}
                img_src={tile_data[3]?.thumbnail}
                size={tile_size}
                bonus={bonuses[3]}
                on_click={() => props.clear_tile(3)}
                on_drop={(tile) => props.set_tile(3, tile)}
            />
            <TileSlot 
                index={4}
                img_src={tile_data[4]?.thumbnail}
                size={tile_size}
                bonus={bonuses[4]}
                on_click={() => props.clear_tile(4)}
                on_drop={(tile) => props.set_tile(4, tile)}
            />
        </div>
        <div class="tile_grid_row" style={`margin-left: ${half_margin}`}>
            <TileSlot 
                index={5}
                img_src={tile_data[5]?.thumbnail}
                size={tile_size}
                bonus={bonuses[5]}
                on_click={() => props.clear_tile(5)}
                on_drop={(tile) => props.set_tile(5, tile)}
            />
            <TileSlot 
                index={6}
                img_src={tile_data[6]?.thumbnail}
                size={tile_size}
                bonus={bonuses[6]}
                on_click={() => props.clear_tile(6)}
                on_drop={(tile) => props.set_tile(6, tile)}
            />
        </div>
    </div>
</div>

