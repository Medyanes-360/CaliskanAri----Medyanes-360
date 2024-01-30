
const allDataConfig = [
    // bu alana cookie ve localstorage'da kullanan düzenli kontrol ettirmek istediğiniz verileri ekleyebilirsiniz.
    // isNewData: true ise veri yeni eklenmiş demektir. fonksiyon bunu kontrol eder ve yenileme işleminden sonra veri tabanına kaydeder.
    {
        name: "GeneralTopPageBanner",
        updateTime: Date.now().toString(),
        endTime: (Date.now() + (1000 * 60 * 60 * 24)).toString(), // 1 gün
        isNewData: false,
    }

]

const dataUpdateConfig = () => {
    const ConfigData = JSON.stringify(allDataConfig);
    return ConfigData;

    
}

export default dataUpdateConfig
