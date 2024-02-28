export const containerStr = ({ padding = 40 }): string => (`
	width: 100%;
	max-width: 1729px;
	padding: 0 ${ padding }px;
	margin: 0 auto;
	display: block;
`)

export const container = ({ padding = 40 }): object => ({
	width: '100%',
	maxWidth: '1350px',
	padding: `0 ${ padding }px`,
	margin: '0 auto',
	display: 'block',
})