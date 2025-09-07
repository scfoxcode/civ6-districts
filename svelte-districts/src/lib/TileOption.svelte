<script lang="ts">
    import { draggable } from '@thisux/sveltednd';

    interface TileOptionsProps {
        tile_type: string;
        thumbnail: string;
        class_name: string;
        id_override?: string;
        handle_drop(): void;
    }

    let props: TileOptionsProps = $props();
</script>

<div
    style="touch-action: none;"
    use:draggable={{ 
        container: props.id_override || props.tile_type,
        callbacks: { onDrop: props.handle_drop },
        dragData: {id: props.id_override || props.tile_type},
    }}
>
    <img 
        src={props.thumbnail}
        alt={props.tile_type}
        class={props.class_name} 
    />
</div>

