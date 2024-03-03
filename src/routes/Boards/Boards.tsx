
import { useParams } from 'react-router-dom';
import Tasks from '../../components/Tasks/Tasks'
import Task from '../../components/Task/Task';

export default function Boards(){
    const {boardNum} = useParams();
    return (
        <>
            {!boardNum && <Tasks/>}
            {!!boardNum && <Task taskNum={+boardNum} />}
        </>
    );
}