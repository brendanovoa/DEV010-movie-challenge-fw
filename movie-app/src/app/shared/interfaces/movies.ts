// Utilizar una interfaz para representar la respuesta de la API que proporciona un contrato claro sobre la estructura que esperas en la respuesta.

export interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    total_pages: number;
    total_results: number;
    page: number;
    production_companies: any[];
    genres: any[];
}

export interface APIresponse {     
    page: number;
    results: Movie[];
    total_pages: number; // 41259
    total_results: number; // 825179
}

export interface GenresList {
    genres: Genre[];
}

export interface Genre {
    id: number;
    name: string;
}