import PresentationDataSources from "@/datasources/PresentationDataSources";

type presentationListData = {
    id: number
    user_id: number
    title: string
    name: string
    document_path: string
    presentation_date: string
}

type presentationState = {
    PresentationList: presentationListData[]
}

export default function PresentationComposiotion() {
    const allPresentationState: presentationState = {
        PresentationList: []
    };

    const datasources = new PresentationDataSources();

    const loadPresentationList = async () => {
        const result = await datasources.getPresentation();

        allPresentationState.PresentationList = result.map(item => {
            return {
                id: item.id,
                user_id: item.user_id,
                title: item.title,
                name: item.name,
                document_path: item.document_path,
                presentation_date: item.presentation_date
            }
        });
    };

    const postPresentationList = async (params: any) => {
        const formData = new FormData();
        formData.append('name', params.name);
        formData.append('title', params.title);
        formData.append('presentation_date', params.presentation_date);
        formData.append('upload_file', new Blob([params.upload_file]));
        const result = await datasources.postPresentation(formData).then((res) => {
            alert('OK!!');
            console.log(res);
        }).catch((err) => {
            alert('失敗!!');
        });
    };

    return {
        loadPresentationList,
        allPresentationState,
        postPresentationList
    }
}
