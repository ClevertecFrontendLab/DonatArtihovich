import { useRequiredContext } from "@hooks/typed-use-context-hook";
import { ModalContext } from "@processes/modal";
import { useGetTrainingsQuery } from "@redux/trainings/api";
import { useWindowSize } from "@uidotdev/usehooks"
import ModalModes from "@utils/const/modal-modes";
import { Calendar } from "antd";
import { Content } from "antd/lib/layout/layout"
import { useEffect } from "react";

type CalendarContentProps = {
    isSiderCollapsed: boolean;
}

export const CalendarContent = ({ isSiderCollapsed }: CalendarContentProps) => {
    const { width } = useWindowSize()
    const { setMode } = useRequiredContext(ModalContext)
    const { data: trainings, isError: isGetTrainingsError } = useGetTrainingsQuery({})

    useEffect(() => {
        if (!isGetTrainingsError) setMode(ModalModes.GetTrainingsError)
    }, [isGetTrainingsError])

    return !width ? null : (
        <Content style={{ width: width > 700 ? (width > 1440 ? 1440 : width) - (isSiderCollapsed ? 64 : 208) : undefined }}>
            <Calendar></Calendar>
        </Content>
    )
}