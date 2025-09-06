import { tile_icon_path } from '../tiles';
import type { TileType } from '../tiles';
import { TileSlot } from './TileSlot';

// Remember to include licence
// https://civ6.fandom.com/wiki/Category:District_icons

export interface TileGridProps {
    tile_names: (TileType | null)[];
}

const tile_size = 164;

export const TileGrid: React.FC<TileGridProps> = (props) => {

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

    return (
        <div>
            <div className="tile_grid_row">
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
            <div className="tile_grid_row">
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
