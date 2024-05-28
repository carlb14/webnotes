import LoadingIcon from "@/assets/loading";

export default function LoadingScreen() {
    return (
        <div className="grid place-items-center" style={{height: '85vh'}}>
            <div className="container"> {/* Add a className or remove this div if not needed */}
                <section className='flex flex-col justify-center items-center'>
                    <LoadingIcon className="my-2 w-12"/>
                    <h1 className="text-xs text-neutral-700">Please wait...</h1>
                </section>
            </div>
        </div>
    );
}