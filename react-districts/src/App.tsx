//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { tile_icon_path, TileTypeEnum } from './tiles';
import { TileOption } from './components/TileOption';
import { TileGrid } from './components/TileGrid';

function App() {

    const tiles = Object.values(TileTypeEnum).map((tile) => ({
        tile_type: tile,
        thumbnail: tile_icon_path(tile),
    }));

    const images = tiles.map((tile) => {
        return (
            <TileOption thumbnail={tile.thumbnail} tile_type={tile.tile_type} class_name="tile_option__small" />
        );
    });

    return (
        <>
            {
                ...images
            }
            <TileGrid tile_names={[null, "WONDER", "CAMPUS"]}/>
        </>
    )
}

export default App
