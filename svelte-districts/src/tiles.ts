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
    COMMERCIAL_HUB: "COMMERCIAL_HUB",
} as const;

export type TileType = typeof TileTypeEnum[keyof typeof TileTypeEnum];

export function tile_icon_path(tile: TileType): string {
    return `/civ6/tile_icons/${tile}.png`;
}

export function is_district(tile_type: TileType): boolean {
    return (
        tile_type == "INDUSTRIAL_ZONE"
        || tile_type == "CAMPUS"
        || tile_type == "HARBOR"
        || tile_type == "THEATER_SQUARE"
        || tile_type == "HOLY_SITE"
        || tile_type == "AQUEDUCT"
        || tile_type == "COMMERCIAL_HUB"
    ); 
}

export function is_productive(tile_type: TileType): boolean {
    return (
        tile_type == "INDUSTRIAL_ZONE"
        || tile_type == "CAMPUS"
        || tile_type == "HARBOR"
        || tile_type == "THEATER_SQUARE"
        || tile_type == "HOLY_SITE"
        || tile_type == "COMMERCIAL_HUB"
    ); 
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

export function calculate_bonus(index: number, grid: (TileType | null)[]): number {

    let total = 0;

    const tile_type = grid[index];

    // Early out if empty or not a district 
    if (!tile_type || !is_district(tile_type) || !is_productive(tile_type)) {
        return 0;
    }


    const adjacent = adjacent_for_index(index);
    const adjacent_types = adjacent.map((tile_index) => grid[tile_index]);

    for (const tile of adjacent_types.filter((t) => Boolean(t))) {
        // Why is typescript not inferring this type?
        const adjacent_name = tile as unknown as TileType;

        if (is_district(adjacent_name)) {
            total += 0.5; // Adjacent bonus for all districts
        }

        // Specific bonuses
        if (tile_type === "INDUSTRIAL_ZONE") {
            if (adjacent_name === "AQUEDUCT") {
                total += 2;
            }
        }

        if (tile_type === "HARBOR") {
            if (adjacent_name === "CITY_CENTER") {
                total += 2;
            }
        }

        if (tile_type === "COMMERCIAL_HUB") {
            if (adjacent_name === "HARBOR") {
                total += 2;
            }
        }

        if (tile_type === "THEATER_SQUARE") {
            if (adjacent_name === "WONDER") {
                total += 2;
            }
        }
    }

    return total;

}

