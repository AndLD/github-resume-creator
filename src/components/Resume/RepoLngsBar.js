import { Bar } from '@ant-design/plots'
import { useContext } from 'react'
import { resumeContext } from '../../context'

export default function RepoLngsBar() {
    const repoLngs = useContext(resumeContext).repoLngs

    const barConfig = {
        data: repoLngs,
        xField: 'percent',
        yField: 'language',
        seriesField: 'language',
        legend: {
            position: 'top'
        }
    }

    return <Bar {...barConfig} />
}
