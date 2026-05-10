import { UseQueryOptions } from '@tanstack/react-query';

export const QUERY_CONFIG_PRESETS = {
	REALTIME: {
		staleTime: 0,
		gcTime: 0,
	},

	DEFAULT: {
		staleTime: 5 * 60 * 1000,

		gcTime: 10 * 60 * 1000,
	},

	STATIC: {
		staleTime: 30 * 60 * 1000,

		gcTime: 60 * 60 * 1000,
	},
} as const;

type QueryConfig = Pick<UseQueryOptions, 'staleTime' | 'gcTime'>;

export const createQueryConfig = (overrides?: QueryConfig): QueryConfig => {
	return {
		...QUERY_CONFIG_PRESETS.DEFAULT,
		...overrides,
	};
};

export default createQueryConfig;
