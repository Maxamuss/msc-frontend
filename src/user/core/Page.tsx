import { createContext, createElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import PageNotFound from "../../core/PageNotFound";
import LoadingSpinner from "../../developer/components/LoadingSpinner";
import { getModelObject } from "../utils/api";
import { componentMap } from "../utils/components";
import { getModelNameFromPath, getPageNameFromPath } from "../utils/routing";
import Model, { getModel } from "./models/model";
import { IPage } from "./models/types";

export default function Page() {
    const location = useLocation();
    const path = location.pathname;
    const modelName = getModelNameFromPath(path);
    const [pageName, modelId] = getPageNameFromPath(path);
    const models = useSelector((state: any) => state.application.models);
    const model = getModel(models, modelName);

    if (!model) {
        return <PageNotFound />;
    }

    const page = model.getPage(pageName);

    if (!page) {
        return <PageNotFound />;
    }

    return (
        <PageRenderer model={model} page={page} modelId={modelId} key={modelName + page} />
    );
}

export const PageContext = createContext({});

export function renderer(layout: any) {
    const component = layout.component;
    const componentId = layout.id;
    let config = layout.config;
    if (typeof componentMap[component] !== "undefined") {
        config['id'] = componentId;
        config['key'] = (Math.random() + 1).toString(36);

        return createElement(
            componentMap[component],
            config,
            (config.children && config.children.map((c: any) => renderer(c)))
        );
    }
}

interface IPageRendererProps {
    model: Model;
    page: IPage;
    modelId?: string;
}

export function PageRenderer(props: IPageRendererProps) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [resource, setResource] = useState({});

    const context = { model: props.model, page: props.page, modelId: props.modelId, resource: resource };

    useEffect(() => {
        getModelObject(props.model, props.modelId, setResource, setIsLoaded, setError);
    }, [])

    if (error) {
        return <div>Error</div>;
    } else if (!isLoaded) {
        return (
            <div className='flex text-center'>
                <div className="m-auto mt-10">
                    <LoadingSpinner theme='dark' />
                </div>
            </div>
        );
    } else {
        return (
            <div className='space-y-6 mx-6'>
                <PageContext.Provider value={context}>
                    <div>test</div>
                    {/* {props.page.layout.map(config => renderer(config))} */}
                </PageContext.Provider>
            </div>
        );
    }
}