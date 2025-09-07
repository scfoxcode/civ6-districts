<script lang="ts">
    import TileOption from './TileOption.svelte';
    import { tile_icon_path, TileTypeEnum } from '../tiles.ts';
    import type { TileType } from './tiles';

    const tiles = Object.values(TileTypeEnum).map((tile) => ({
        tile_type: tile,
        thumbnail: tile_icon_path(tile),
    }));

</script>

<div class="tile_options">
    {#each tiles as tile}
        <TileOption 
            thumbnail={tile.thumbnail}
            tile_type={tile.tile_type}
            class_name="tile_option__small"
            handle_drop={() => console.log("we dropped")}
        /> 
    {/each}
</div>
