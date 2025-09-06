import './App.css'
import { useState } from 'react';
import { tile_icon_path, TileTypeEnum } from './tiles';
import type { TileType } from './tiles';
import { TileOption } from './components/TileOption';
import { TileGrid } from './components/TileGrid';
import { DndContext } from '@dnd-kit/core';

function App() {

    const [grid, setGrid] = useState<(TileType | null)[]>([
        null,
        null,
        null,
        null,
        null,
        null,
        null,
    ]);

    const set_tile_at_index = (index: number, tile: TileType | null) => {
        const new_grid = [...grid];
        new_grid[index] = tile;
        setGrid(new_grid);
    }

    const tiles = Object.values(TileTypeEnum).map((tile) => ({
        tile_type: tile,
        thumbnail: tile_icon_path(tile),
    }));

    const images = tiles.map((tile) => {
        return (
            <TileOption
                key={tile.tile_type}
                thumbnail={tile.thumbnail}
                tile_type={tile.tile_type}
                class_name="tile_option__small"
            />
        );
    });

    return (
        <DndContext
            onDragEnd={(data) => {
                if (data.over) {
                    const tile_type = data.active.id as unknown as TileType;
                    const id = data.over.id as unknown as string;
                    // Not great, would be better if we could include the grid index in event data
                    const grid_index_str = id.split("_");
                    const grid_index = parseInt(grid_index_str[grid_index_str.length -1]);

                    set_tile_at_index(grid_index, tile_type);
                }

            }}
        >
            <div>
                <div className="tile_options">
                    {
                        ...images
                    }
                </div>
            </div>
            <div>
                <div className="tile_grid">
                    <TileGrid
                        tile_names={grid}
                        clear_tile={(index: number) => set_tile_at_index(index, null)}
                    />
                </div>
            </div>
            <div>
                <div className="footer">
                    <p>
                        Icons sourced from <a href="https://civ6.fandom.com/wiki/Category:District_icons" target="_blank">
                        Civ6 Fandom</a>, where they are available under a CC BY-NC-SA license. 
                        Original artwork is by Firaxis Games for <em>Sid Meier's Civilization VI</em>.
                    </p>
                    <p>
                        This is a non-commerical fan project created by Stephen Surtees for learning purposes. 
                        It is not affiliated with, endorsed, or sponsored by Firaxis Games, 2K, or Civ6 Fandom.
                    </p>
                </div>
            </div>
        </DndContext>
    )
}

export default App
