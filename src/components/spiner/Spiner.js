const Spiner = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={{margin: 'auto', background: 'none',display: 'block', shapeRendering: 'auto', animationPlayState: 'running', animationDelay: '0s'}} width="100px" height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <rect x="20" y="29" width="10" height="42" fill="#1d3f72" style={{animationPlayState: 'running', animationDelay: '0s'}}>
            <animate attributeName="y" repeatCount="indefinite" dur="0.970873786407767s" calcMode="spline" keyTimes="0;0.5;1" values="8;29;29" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.1941747572815534s" style={{animationPlayState: 'running', animationDelay: '0s'}}></animate>
            <animate attributeName="height" repeatCount="indefinite" dur="0.970873786407767s" calcMode="spline" keyTimes="0;0.5;1" values="84;42;42" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.1941747572815534s" style={{animationPlayState: 'running', animationDelay: '0s'}}></animate>
            </rect>
            <rect x="45" y="29" width="10" height="42" fill="#5699d2" style={{animationPlayState: 'running', animationDelay: '0s'}}>
            <animate attributeName="y" repeatCount="indefinite" dur="0.970873786407767s" calcMode="spline" keyTimes="0;0.5;1" values="13.25;29;29" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.0970873786407767s" style={{animationPlayState: 'running', animationDelay: '0s'}}></animate>
            <animate attributeName="height" repeatCount="indefinite" dur="0.970873786407767s" calcMode="spline" keyTimes="0;0.5;1" values="73.5;42;42" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.0970873786407767s" style={{animationPlayState: 'running', animationDelay: '0s'}}></animate>
            </rect>
            <rect x="70" y="29" width="10" height="42" fill="#d8ebf9" style={{animationPlayState: 'running', animationDelay: '0s'}}>
            <animate attributeName="y" repeatCount="indefinite" dur="0.970873786407767s" calcMode="spline" keyTimes="0;0.5;1" values="13.25;29;29" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" style={{animationPlayState: 'running', animationDelay: '0s'}}></animate>
            <animate attributeName="height" repeatCount="indefinite" dur="0.970873786407767s" calcMode="spline" keyTimes="0;0.5;1" values="73.5;42;42" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" style={{animationPlayState: 'running', animationDelay: '0s'}}></animate>
            </rect>
        </svg>
    );
};

export default Spiner;