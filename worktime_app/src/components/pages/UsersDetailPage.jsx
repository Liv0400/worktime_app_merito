import { WeekListManager } from './WeekListMenager'; 

const UsersDetailPage = ({ userId }) => {
  return (
    <div>
      {userId} 
      <WeekListManager />
    </div>
  );
};

export default UsersDetailPage;