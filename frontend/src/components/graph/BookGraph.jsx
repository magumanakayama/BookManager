import { useState } from 'react';
import { useLocalStorage } from 'react-use';
import { Box } from '@mui/material';
import useCustomParams from '../../lib/paramsHook';

import AuthorGraph from './AuthorGraph';
import AuthorList from './AuthorList';
import listFormatterPie from './listFormatterPie';

import MonthlyGraph from './MonthlyGraph';
import MonthlyList from './MonthlyList';
import YearSelect from './YearSelect.jsx';
import listFormatterBar from './listFormatterBar';


const BookGraph = () => {
  const MAX_DISPLAY = 5;

  const [bookInfo, _] = useLocalStorage('books', []);
  // yearステートは移動予定
  const [year, setYear] = useState(new Date().getFullYear());

  const { sortedAuthors, legendData } = listFormatterPie(bookInfo, MAX_DISPLAY);
  const { totalCount, yearlyList, monthlyList } = listFormatterBar(bookInfo);

  const graphMode = useCustomParams().getParam().val;

  return (
    <Box sx={{ maxWidth: 600 }}>
      {graphMode === 'author' &&
        <>
          <AuthorGraph legendData={legendData} />
          <AuthorList bookInfo={bookInfo} sortedAuthors={sortedAuthors} />
        </>
      }
      {graphMode === 'monthly' &&
        <>
          <YearSelect yearlyList={yearlyList} year={year} setYear={setYear} />
          <MonthlyGraph year={year} monthlyList={monthlyList.find(item => item.year === year)?.['months']} />
          <MonthlyList totalCount={totalCount} thisYearMonthlyList={monthlyList.find(item => item.year === year)?.['months']} />
        </>
      }
    </Box >
  );
};

export default BookGraph;