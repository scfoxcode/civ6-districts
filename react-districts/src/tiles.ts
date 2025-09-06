// Apparently TS doesn't like enum's anymore.... using as const instead

export const TileTypeEnum = {
    CITY_CENTER: "CITY_CENTER",
    WONDER: "WONDER",
    INDUSTRIAL_ZONE: "INDUSTRIAL_ZONE",
    CAMPUS: "CAMPUS",
    HARBOR: "HARBOR",
    THEATER_SQUARE: "THEATER_SQUARE",
    HOLY_SITE: "HOLY_SITE",
    AQUEDUCT: "AQUEDUCT",
} as const;

export type TileType = typeof TileTypeEnum[keyof typeof TileTypeEnum];

export function tile_icon_path(tile: TileType): string {
    return `/tile_icons/${tile}.png`;
}

// Returns the indices of adjacent nodes for any given index
// Dumb approach. Not scalable, but I do not plan to scale this
export function adjacent_for_index(index: number): number[] {
    if (index == 0) {
        return [1, 2, 3];
    } else if (index == 1) {
        return [0, 3, 4];
    } else if (index == 2) {
        return [0, 3, 5];
    } else if (index == 3) {
        return [0, 1, 2, 4, 5, 6];
    } else if (index == 4) {
        return [1, 3, 6];
    } else if (index == 5) {
        return [2, 3, 6];
    } else if (index == 6) {
        return [3, 4, 5];
    } else {
        return [];
    }
}

