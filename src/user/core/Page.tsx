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
        <PageRenderer model={model} page={page} modelId={modelId} key={modelName + pageName} />
    );
}

// This function replaces template arguments with the current page's syntax definition.
export const inject = (str: string, obj: any) => str.replace(/\${(.*?)}/g, (x, g) => obj[g]);

export function renderText(str: string, resource: any, model?: Model) {
    if (str && resource) {
        if (model) {
            str = str.replace('<MODEL_NAME>', model.model_name());
            str = str.replace('<MODEL_NAME_PLURAL>', model.model_name_plural());
        }

        const renderedStr = inject(str, resource);
        if (renderedStr) {
            return renderedStr;
        } else {
            return '-'
        }
    }
    return str;
}

export function renderer(component: any) {
    const componentType = component.component;
    let config = component.config;

    if (typeof componentMap[componentType] !== "undefined") {
        config['key'] = (Math.random() + 1).toString(36);

        return createElement(
            componentMap[componentType],
            config,
            // (config.children && config.children.map((c: any) => renderer(c)))
        );
    }
}

export const PageContext = createContext<{
    model?: Model;
    page?: IPage;
    modelId?: string;
    resource?: any;
}>({ model: undefined, page: undefined, modelId: undefined, resource: undefined });

interface IPageRendererProps {
    model: Model;
    page: IPage;
    modelId?: string;
}

export function PageRenderer(props: IPageRendererProps) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);
    const [resource, setResource] = useState({});

    const context = { model: props.model, page: props.page, modelId: props.modelId, resource: resource };

    useEffect(() => {
        if (props.modelId) {
            getModelObject(props.model, props.modelId, setResource, setIsLoaded, setError,);
        }
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
                    {props.page.layout.map((component: any) => renderer(component))}
                </PageContext.Provider>
            </div>
        );
    }
}