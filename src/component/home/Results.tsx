import React, { useEffect } from 'react';
import useAPI from '../../utils/hooks/useAPI';
import * as Endpoints from '../../api/Endpoints';
import { replaceStr } from '../../utils/helper';

const Results: React.FC = () => {
  const { execute, response, loading } = useAPI(replaceStr(Endpoints.USER_LIST, 'USERNAME', 'palani'));
  useEffect(() => {
    execute();
  }, []);
  return <></>;
};

export default Results;
