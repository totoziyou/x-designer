import React from 'react'
import { Col, ColorPicker, Divider, Row, Space, theme } from 'antd'

export const PropsColor = (props) => {

    const {title, value, onChange} = props;
    
    const onColorChange = (val) => {
        const hex = `#${val.toHex()}`;
        onChange(hex)
    }

    const customPanelRender = (_, { components: { Picker, Presets } }) => (
        <Row justify="space-between" wrap={false}>
            <Col span={12}>
                <Presets />
            </Col>
            <Divider type="vertical" style={{ height: 'auto' }} />
            <Col flex="auto">
                <Picker />
            </Col>
        </Row>
    );

    return (
        <div className="xdc-props-editor xdc-color-props-editor">
            <div className="xdc-props-editor-row">
                <div className="editor-label">
                    {title}
                </div>
                <div className="editor-cell">
                    <ColorPicker
                        defaultValue={value}
                        format="hex"
                        style={{width: 120, justifyContent: 'flex-start'}}
                        styles={{ popupOverlayInner: { width: 480 } }}
                        showText
                        panelRender={customPanelRender}
                        onChange={onColorChange}
                    />
                </div>
            </div>
        </div>
    )


}