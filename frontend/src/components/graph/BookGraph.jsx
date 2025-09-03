import { useState } from 'react';
import { Box, Button } from '@mui/material';
import HeaderLayout from '../HeaderLayout';
import GraphHeader from './GraphHeader';

import AuthorGraph from './AuthorGraph';
import AuthorList from './AuthorList';
import listFormatterPie from './listFormatterPie';

import MonthlyGraph from './MonthlyGraph';
import MonthlyList from './MonthlyList';
import YearSelect from './YearSelect.jsx';
import listFormatterBar from './listFormatterBar';


const BookGraph = ({ bookInfo }) => {
  const MAX_DISPLAY = 5;
  const [graphMode, setGraphMode] = useState("author");
  // yearステートは移動予定
  const [year, setYear] = useState(new Date().getFullYear());

  const { sortedAuthors, legendData } = listFormatterPie(bookInfo, MAX_DISPLAY);
  const { monthlyList, yearlyList } = listFormatterBar(bookInfo);


  return (
    <Box>
      <HeaderLayout>
        <GraphHeader graphMode={graphMode} setGraphMode={setGraphMode} />
      </HeaderLayout>
      {/* <Button variant="outlined" onClick={() => window.history.back()} >戻る</Button> */}
      {graphMode === "author" &&
        <>
          <AuthorGraph legendData={legendData} />
          <AuthorList bookInfo={bookInfo} sortedAuthors={sortedAuthors} />
        </>
      }
      {graphMode === "monthly" &&
        <>
          <YearSelect yearlyList={yearlyList} year={year} setYear={setYear} />
          <MonthlyGraph monthlyList={monthlyList} />
          <MonthlyList monthlyList={monthlyList} />
        </>
      }
    </Box >
  );
};

export default BookGraph;