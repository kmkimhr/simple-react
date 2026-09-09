import { useImperativeHandle, useRef } from 'react';
import type { Ref } from 'react';
import type { TodoFilter } from '@/types/todo';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import styles from './FilterBar.module.css';

/** 부모에게 허용할 조작 목록 */
export type FilterBarHandle = {
  focus: () => void;
};

type FilterBarProps = {
  filter: TodoFilter;
  keyword: string;
  onFilterChange: (filter: TodoFilter) => void;
  onKeywordChange: (keyword: string) => void;
  ref?: Ref<FilterBarHandle>;
};

const FILTERS: { value: TodoFilter; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '진행중' },
  { value: 'done', label: '완료' },
];

const FilterBar = ({
  ref,
  filter,
  keyword,
  onFilterChange,
  onKeywordChange,
}: FilterBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // 부모가 ref.current 로 받는 것은 <input> DOM 이 아니라 이 객체다
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
  }), []);

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
        ref={inputRef}
        type="search"
        className={styles.search}
        value={keyword}
        onChange={e => onKeywordChange(e.target.value)}
        placeholder="검색 (/)"
        aria-label="할 일 검색"
      />
    </div>
  );
};

export default FilterBar;
