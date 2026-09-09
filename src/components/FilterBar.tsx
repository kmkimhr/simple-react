import type { TodoFilter } from '@/types/todo';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import styles from './FilterBar.module.css';

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
    <div className={styles.bar}>
      <div className={styles.tabs}>
        {FILTERS.map(item => (
          <Button
            key={item.value}
            size="sm"
            variant={item.value === filter ? 'primary' : 'secondary'}
            onClick={() => onFilterChange(item.value)}
          >
            {item.label}
          </Button>
        ))}
      </div>
      <Input
        type="search"
        className={styles.search}
        value={keyword}
        onChange={e => onKeywordChange(e.target.value)}
        placeholder="검색"
        aria-label="할 일 검색"
      />
    </div>
  );
};

export default FilterBar;
