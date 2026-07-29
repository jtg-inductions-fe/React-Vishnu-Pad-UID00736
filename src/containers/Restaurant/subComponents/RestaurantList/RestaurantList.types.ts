import { Restaurant } from '@type';

export interface RestaurantListProps {
    restaurants: Restaurant[];
    isLoading: boolean;
    layout?: 'horizontal' | 'grid';
    onViewAll?: () => void;
    onExploreRestaurant: (id: string | number) => () => void;
}
