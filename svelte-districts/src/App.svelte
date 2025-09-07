<script lang="ts">
    import svelteLogo from './assets/svelte.svg';
    import viteLogo from '/vite.svg';
    import Counter from './lib/Counter.svelte';
    import TileOptions from './lib/TileOptions.svelte';
    import TileGrid from './lib/TileGrid.svelte';
    import Footer from './lib/Footer.svelte';

    const grid: (TileType | null)[] = $state([
        null,
        null,
        null,
        null,
        null,
        null,
        null,
    ]);

    function clear_tile(index: number) {
        grid[index] = null;
    }

    function set_tile(index: number, tile: (TileType | null)) {
        grid[index] = tile;
    }

</script>

<main>
    <TileOptions />
    <div>
        <TileGrid 
            tile_names={grid}
            clear_tile={clear_tile}
            set_tile={set_tile}
        />
    </div>
    <div>
        <Footer /> 
    </div>
</main>

<style>
</style>
