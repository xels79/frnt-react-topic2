
import { useParams } from 'react-router-dom';
import Tasks from '../../components/Tasks/Tasks'
import Task from '../../components/Task/Task';
import useAppDispatch from '../../hooks/AppDispatch';
import { useEffect } from 'react';
import { addBreadCrumbs } from '../../store/slice/breadcrumbs/BreadCrumbsSlice';

export default function Boards(){
    const dispatch = useAppDispatch();
    const {boardNum} = useParams();
    useEffect(()=>{
        if (!boardNum){
            dispatch(addBreadCrumbs([
                {label:'Доски',link:null},
            ]));
        }
    });
    return (
        <>
            {!boardNum && <Tasks/>}
            {!!boardNum && <Task taskNum={+boardNum} />}
        </>
    );
}