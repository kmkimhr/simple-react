import type { TodoFilter } from '@/types/todo';

type FilterBarProps = {
  filter: TodoFilter;
  keyword: string;
  onFilterChange: (filter: TodoFilter) => void;
  onKeywordChange: (keyword: string) => void;
};

const FILTERS: { value: TodoFilter; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '진행중' },
  { value: 'done', label: '완료' },
];

const FilterBar = ({
  filter,
  keyword,
  onFilterChange,
  onKeywordChange,
}: FilterBarProps) => {
  return (
    <div className="filter-bar">
      <div className="filter-tabs">
        {FILTERS.map(item => (
          <button
            key={item.value}
            type="button"
            className={item.value === filter ? 'filter-tab active' : 'filter-tab'}
            onClick={() => onFilterChange(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <input
        type="search"
        className="filter-search"
        value={keyword}
        onChange={e => onKeywordChange(e.target.value)}
        placeholder="검색"
      />
    </div>
  );
};

export default FilterBar;
