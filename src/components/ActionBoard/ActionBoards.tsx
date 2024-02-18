import ActionBoard from "./ActionBoard"
import { IActionBoard } from "./ActionBoard"
export default function ActionBoards({ boards }:{
    boards:IActionBoard[]
}){
    return <>{boards.map(board=><ActionBoard
        header={board.header}
        data={board.data}
        actionList={board.actionList}
    />)}</>
}