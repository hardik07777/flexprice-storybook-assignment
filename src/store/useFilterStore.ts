import { create } from 'zustand';

type FilterValue = string | number | boolean | object | null;

type Filters = Record<string, FilterValue>;

interface FilterStore {
	filters: Record<string, Filters>;

	setFilter: (route: string, key: string, value: FilterValue) => void;

	getFilters: (route: string) => Filters;

	resetFilters: (route: string) => void;

	syncFingerprintToUrl: (route: string) => void;
}

const STORAGE_PREFIX = 'filters:';

const getStorageKey = (route: string) => `${STORAGE_PREFIX}${route}`;

const generateFingerprint = (filters: Filters) => {
	try {
		return btoa(JSON.stringify(filters)).slice(0, 12);
	} catch {
		return 'default';
	}
};

const getStoredFilters = (route: string): Filters => {
	try {
		const stored = sessionStorage.getItem(getStorageKey(route));

		return stored ? JSON.parse(stored) : {};
	} catch {
		return {};
	}
};

export const useFilterStore = create<FilterStore>((set, get) => ({
	filters: {},

	setFilter: (route, key, value) => {
		set((state) => {
			const existing = state.filters[route] || getStoredFilters(route);

			const updated = {
				...existing,
				[key]: value,
			};

			sessionStorage.setItem(getStorageKey(route), JSON.stringify(updated));

			return {
				filters: {
					...state.filters,
					[route]: updated,
				},
			};
		});

		get().syncFingerprintToUrl(route);
	},

	getFilters: (route) => {
		const state = get();

		return state.filters[route] || getStoredFilters(route);
	},

	resetFilters: (route) => {
		sessionStorage.removeItem(getStorageKey(route));

		set((state) => ({
			filters: {
				...state.filters,
				[route]: {},
			},
		}));

		get().syncFingerprintToUrl(route);
	},

	syncFingerprintToUrl: (route) => {
		const filters = get().getFilters(route);

		const fingerprint = generateFingerprint(filters);

		const url = new URL(window.location.href);

		url.searchParams.set('f', fingerprint);

		window.history.replaceState({}, '', url.toString());
	},
}));

export default useFilterStore;
