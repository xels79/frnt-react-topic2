import ActionBoard from "./ActionBoard"
import { ITodo, ITodoAction } from "../../interfaces/ITodo";
export default function ActionBoards({ boards }:{
    boards:ITodo[]
}){
    return <>{boards.map((board, index)=><ActionBoard
        key={`abs-${index}`}
        header={board.name}
        data={board.created_a}
        actionList={board.todoActions as ITodoAction[]}
    />)}</>
}