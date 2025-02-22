export default function Hero(props: { title: string, paragraphe?: string }) {
    /*---> Props <---*/
    const { title, paragraphe } = props;

    return <>
        <div className="flex flex-col gap-2 items-center text-center">
            <h1 className="text-[37px] font-[700]">{title}</h1>
            <p className="w-72 lg:w-[65%]">{paragraphe}</p>
        </div>
    </>
}