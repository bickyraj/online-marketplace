import { observer } from "mobx-react-lite";
import {useEffect} from "react";
import eurekaServiceStore, {Application} from "../../store/EurekaServiceStore.ts";
const EurekaServices = () => {
    useEffect(() => {
        const eurekaService = async () => {
            await eurekaServiceStore.getMyPaymentMethods();
        }
        eurekaService();
    }, []);
    return (
        <>
            <div className="grid grid-cols-3 gap-4">
                {eurekaServiceStore.applicationServices.length > 0 && (
                    eurekaServiceStore.applicationServices.map((application: Application, index: number) => (
                        <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg">
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{application.name}</div>
                                <p className="text-gray-700 text-base">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores
                                    et perferendis eaque, exercitationem praesentium nihil.
                                </p>
                            </div>
                            <div className="px-6 pt-4 pb-2">
                                <span
                                    className="inline-block bg-green-100 rounded px-3 py-1 text-xs font-semibold text-green-800 mr-2 mb-2">
                                   {application.instance.filter(inst => inst.status.toLowerCase() == 'up').length} UP
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}

export default observer(EurekaServices);