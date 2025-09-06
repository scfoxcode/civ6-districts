import { useState, useEffect } from 'react';
import { tile_icon_path } from '../tiles';
import type { TileType } from '../tiles';
import { TileSlot } from './TileSlot';

// Remember to include licence
// https://civ6.fandom.com/wiki/Category:District_icons

export interface TileGridProps {
    tile_names: (TileType | null)[];
}

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

export const TileGrid: React.FC<TileGridProps> = (props) => {

    const [tile_size, set_tile_size] = useState(calc_tile_size());

    useEffect(() => {
        const handle_resize = () => {
            set_tile_size(calc_tile_size());
        };

        window.addEventListener('resize', handle_resize);

        return () => {
            window.removeEventListener('resize', handle_resize);
        }

    }, []);

    const tile_data = props.tile_names.map((name) => {
        if (!name) {
            return null;
        } else {
            return {
                tile_type: name,
                thumbnail: tile_icon_path(name),
            };
        }
    })

    const half_margin = `${tile_size / 2.0}px`;

    return (
        <div className="tile_grid_inner">
            <div className="tile_grid_row" style={{marginLeft: half_margin}}>
                <TileSlot 
                    index={0}
                    img_src={tile_data[0]?.thumbnail}
                    size={tile_size}/>
                <TileSlot 
                    index={1}
                    img_src={tile_data[1]?.thumbnail}
                    size={tile_size}/>
            </div>
            <div className="tile_grid_row">
                <TileSlot 
                    index={2}
                    img_src={tile_data[2]?.thumbnail}
                    size={tile_size}/>
                <TileSlot 
                    index={3}
                    img_src={tile_data[3]?.thumbnail}
                    size={tile_size}/>
                <TileSlot 
                    index={4}
                    img_src={tile_data[4]?.thumbnail}
                    size={tile_size}/>
            </div>
            <div className="tile_grid_row" style={{marginLeft: half_margin}}>
                <TileSlot 
                    index={5}
                    img_src={tile_data[5]?.thumbnail}
                    size={tile_size}/>
                <TileSlot 
                    index={6}
                    img_src={tile_data[6]?.thumbnail}
                    size={tile_size}/>
            </div>
        </div>
    );
}
