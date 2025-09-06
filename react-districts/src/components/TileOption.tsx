import { useDraggable } from '@dnd-kit/core';

interface TileOptionsProps {
    tile_type: string;
    thumbnail: string;
    class_name: string;
    id_override?: string;
}

export const TileOption: React.FC<TileOptionsProps> = (props) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.id_override || props.tile_type,
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <div
            ref={setNodeRef}
            style={{touchAction: "none"}}
        >
            <img 
                style={style}
                {...listeners}
                {...attributes}
                src={props.thumbnail}
                alt={props.tile_type}
                className={props.class_name} 
            />
        </div>
    )
}
