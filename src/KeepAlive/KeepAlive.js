import { useReducer, useCallback } from 'react';
import keepAliveReducer from './keepAliveReducer';
import { KeepAliveContext } from './KeepAliveContext';
import * as actionTypes from './actionTypes';

function KeepAlive (props) {
	const [ keepAliveStates, dispatch ] = useReducer(keepAliveReducer, {});

	const setKeepAliveState = useCallback(({ reactElement, keepAliveId }) => {
		if(!keepAliveStates[keepAliveId]) {
			dispatch({
				type: actionTypes.CREATING,
				payload: {
					keepAliveId,
					reactElement
				}
			})
		} else {
		}
	}, [keepAliveStates])

	return (
		<KeepAliveContext.Provider 
			value={{
				keepAliveStates,
				setKeepAliveState,
				dispatch,
			}}
		>
			{ props.children }
			{
				Object.values(keepAliveStates).map(({ keepAliveId, reactElement }) => 
					<div key={keepAliveId} ref={ (node) => {
						if(node && !keepAliveStates[keepAliveId].nodes){
							dispatch({
								type: actionTypes.CREATED,
								payload: {
									keepAliveId,
									nodes: [...node.childNodes]
								}
							})
						}
					}}>
						{reactElement}
					</div>
				)
			}
		</KeepAliveContext.Provider>
	)
}

export default KeepAlive;