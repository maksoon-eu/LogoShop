import './manufacturer.scss'

const Manufacturer = () => {
    const manufacturerImg = [
        {img: 'images/manu1.png'},
        {img: 'images/manu2.png'},
        {img: 'images/manu3.png'},
        {img: 'images/manu4.png'},
        {img: 'images/manu5.png'},
        {img: 'images/manu6.png'}
    ]

    const manuList = manufacturerImg.map(({img}, i) => {
        return (
            <div key={i} className="manu__item">
                    <img src={img} alt="" />
            </div>
        )
    })

    return (
        <>
            <div className="list__header">
                <h2 className="list__title">Популярные производители</h2>
            </div>
            <div className="manu">
                {manuList}
            </div>
        </>
    );
};

export default Manufacturer;