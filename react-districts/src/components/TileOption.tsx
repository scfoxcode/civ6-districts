
interface TileOptionsProps {
    tile_type: string;
    thumbnail: string;
    class_name: string;
}

export const TileOption: React.FC<TileOptionsProps> = (props) => {
    return (
        <img src={props.thumbnail} alt={props.tile_type} className={props.class_name} />
    )
}
