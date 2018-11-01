import React from 'react';

import { Table, Input, Button, Popconfirm, Form } from 'antd';

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    state = {
        editing: false,
    }

    componentDidMount() {
        if (this.props.editable) {
            document.addEventListener('click', this.handleClickOutside, true);
        }
    }

    componentWillUnmount() {
        if (this.props.editable) {
            document.removeEventListener('click', this.handleClickOutside, true);
        }
    }

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    }

    handleClickOutside = (e) => {
        const { editing } = this.state;
        if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
            this.save();
        }
    }

    save = () => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error) {
                return;
            }
            this.toggleEdit();
            let value = values[Object.keys(values)[0]];
            if (value === '') {
                values[Object.keys(values)[0]] = '-';
            }
            handleSave({ ...record, ...values });
        });
    }

    render() {
        const { editing } = this.state;
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            ...restProps
        } = this.props;
        return (
            <td ref={node => (this.cell = node)} {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>
                        {(form) => {
                            this.form = form;
                            return (
                                editing ? (
                                    <FormItem style={{ margin: 0 }}>
                                        {form.getFieldDecorator(dataIndex, {
                                            rules: [{
                                                required: false,
                                                message: `${title} is required.`,
                                            }],
                                            initialValue: record[dataIndex],
                                        })(
                                            <Input
                                                ref={node => (this.input = node)}
                                                onPressEnter={this.save}
                                            />
                                        )}
                                    </FormItem>
                                ) : (
                                    <div
                                        className="editable-cell-value-wrap"
                                        style={{ paddingRight: 24 }}
                                        onClick={this.toggleEdit}
                                    >
                                        {restProps.children}
                                    </div>
                                )
                            );
                        }}
                    </EditableContext.Consumer>
                ) : restProps.children}
            </td>
        );
    }
}

class SymptomsTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: 'Anatomy',
            dataIndex: 'anatomy',
            width: '30%',
            editable: true,
        }, {
            title: 'Sensation',
            dataIndex: 'sensation',
            editable: true,
        }, {
            title: 'Duration',
            dataIndex: 'duration',
            editable: true,
        }, {
            title: 'Notes',
            dataIndex: 'notes',
            editable: true,
        }, {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => {
                return (
                    this.props.dataSource.length >= 1
                        ? (
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                                <a href="javascript:;">Delete</a>
                            </Popconfirm>
                        ) : null
                );
            },
        }];
    }

    handleDelete = (key) => {
        const dataSource = [...this.props.dataSource];
        const newData = dataSource.filter(item => item.key !== key);
        this.props.onChange(newData);
    }

    handleAdd = () => {
        let lastKey = 0;
        const lastRecord = this.props.dataSource[this.props.dataSource.length - 1];
        if (lastRecord) {
            lastKey = lastRecord.key
        }
        const newData = {
            key: lastKey + 1,
            anatomy: '-',
            sensation: '-',
            duration: '-',
            notes: '-'
        };
        this.props.onChange([...this.props.dataSource, newData]);
    }

    handleSave = (row) => {
        const newData = [...this.props.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.props.onChange(newData);
    }

    render() {
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={this.props.dataSource}
                    columns={columns}
                    size='middle'
                    pagination={false}
                />
                <Button onClick={this.handleAdd} type="primary" style={{ marginTop: 16 }}>
                    Add Symptom
                </Button>
            </div>
        );
    }
}

export default SymptomsTable;