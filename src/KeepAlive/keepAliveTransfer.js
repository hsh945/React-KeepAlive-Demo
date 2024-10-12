import { useEffect, useRef, useContext } from 'react';
import { KeepAliveContext } from './KeepAliveContext';

function keepAliveTransfer (KeepAliveComponent, keepAliveId) {
	return function (props) {
		const _ref = useRef(null);
		const { keepAliveStates, setKeepAliveState } = useContext(KeepAliveContext);

		useEffect(() => {
			const state = keepAliveStates[keepAliveId];
			if (state && state.nodes) {
			    // 从缓存里面根据 id 取出真实 dom 直接通过 _ref 获取 div 将缓存的页面拼接进去
				state.nodes.forEach(node => _ref.current.appendChild(node));
			} else {
                // 缓存里面没有，相当于首次挂载页面，缓存的是传进来的 KeepAliveComponent 组件
				setKeepAliveState({
					reactElement: <KeepAliveComponent {...props} />,
					keepAliveId,
				})
			}
		}, [keepAliveStates, setKeepAliveState, props])

		return (
			<div ref={ _ref }></div>
		)
	}
}

export default keepAliveTransfer;