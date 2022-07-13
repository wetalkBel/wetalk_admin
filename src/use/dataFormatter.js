
import moment from "moment";

export default {
    filesFormatter(arr) {
        if (!arr || !arr.length) return []
        return arr.map(item => ({
            name: item.name,
            publicUrl: item.publicUrl || ''
        }))
    },
    imageFormatter(arr) {
        if (!arr || !arr.length) return []
        return arr.map(item => ({
            publicUrl: item.publicUrl || ''
        }))
    },
    oneImageFormatter(arr) {
        if (!arr || !arr.length) return ''
        return arr[0].publicUrl || ''
    },
    dateFormatter(date) {
        if (!date) return ''
        return moment(date).format('YYYY-MM-DD')
    },
    dateTimeFormatter(date) {
        if (!date) return ''
        return moment(date).format('YYYY-MM-DD HH:mm')
    },
    booleanFormatter(val) {
        return val ? 'Yes' : 'No'
    },
    chatsManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.name)
        },
        chatsOneListFormatter(val) {
            if (!val) return {label: null, value: null}
            return {label: val.name, value: val.id }
        },
        chatsManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map(item => ({
                label: item.name,
                id: item.id
            }))
        },
        problemCodesManyListFormatter(val) {

            if (!val || !val.length) return []

            let sessionReport = {
                CommunicationTypes: '',
                Appeal: '',
                HelpTypes: [],
                Methods: '',
                Address: '',
                ProblemCodes: ''
            };

            let helpTypeItem = [];
            let problemCodeItem = [];
            let methodItem = [];

            function formatReportCodeName(report) {
                return report.split('::').slice(1).join(' / ');
            }

            val.map(item => {
                if (item.name && item.name.includes('CommunicationTypes')) {
                    sessionReport.CommunicationTypes = formatReportCodeName(item.name)
                }

                if (item.name && item.name.includes('Appeal')) {
                    sessionReport.Appeal = formatReportCodeName(item.name)
                }

                if (item.name && item.name.includes('Address')) {
                    sessionReport.Address = formatReportCodeName(item.name)
                }

                if (item.name && item.name.includes('HelpTypes')) {
                    helpTypeItem.push(formatReportCodeName(item.name))
                }

                if (item.name && item.name.includes('Methods')) {
                    methodItem.push(formatReportCodeName(item.name))
                }

                if (item.name && item.name.includes('ProblemCodes')) {
                    problemCodeItem.push(item.name.split('::')[2])
                }
            })

            sessionReport.HelpTypes = helpTypeItem.join(', ');
            sessionReport.ProblemCodes = problemCodeItem.join('; ');
            sessionReport.Methods = methodItem.join('; ');

            return sessionReport;
        },
        problemCodesOneListFormatter(val) {
            if (!val) return {label: null, value: null}
            return {label: val.name, value: val.id }
        },
        problemCodesManyListFormatterEdit(val) {

            if (!val || !val.length) return []

            val.forEach(item => {
                let i;

                if(item.name.includes('Address')) {
                    i = item.name.replace('Address', 'Адрес').split('::').join('/')
                }

                if(item.name.includes('Appeal')) {
                    i = item.name.replace('Appeal', 'Тип обращения').split('::').join('/')
                }

                if(item.name.includes('ProblemCodes')) {
                    i = item.name.replace('ProblemCodes', 'Код проблемы').split('::').join('/')
                }

                if(item.name.includes('Methods')) {
                    i = item.name.replace('Methods', 'Метод').split('::').join('/')
                }

                if(item.name.includes('HelpTypes')) {
                    i = item.name.replace('HelpTypes', 'Тип помощи').split('::').join('/')
                }

                if(item.name.includes('CommunicationTypes')) {
                    i = item.name.replace('CommunicationTypes', 'Вид связи').split('::').join('/')
                }

                item.name = i;
            });

            return val.map(item => ({
                label: item.name,
                id: item.id
            }))
        },
        tagsManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.name)
        },
        tagsOneListFormatter(val) {
            if (!val) return {label: null, value: null}
            return {label: val.name, value: val.id }
        },
        tagsManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map(item => ({
                label: item.name,
                id: item.id
            }))
        },
        pagesManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.name)
        },
        pagesOneListFormatter(val) {
            if (!val) return {label: null, value: null}
            return {label: val.name, value: val.id }
        },
        pagesManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map(item => ({
                label: item.name,
                id: item.id
            }))
        },
        citiesManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.name)
        },
        citiesOneListFormatter(val) {
            if (!val) return {label: null, value: null}
            return {label: val.name, value: val.id }
        },
        citiesManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map(item => ({
                label: item.name,
                id: item.id
            }))
        },
        gendersManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.name)
        },
        gendersOneListFormatter(val) {
            if (!val) return {label: null, value: null}
            return {label: val.name, value: val.id }
        },
        gendersManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map(item => ({
                label: item.name,
                id: item.id
            }))
        },
        module_typesManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.name)
        },
        module_typesOneListFormatter(val) {
            if (!val) return {label: null, value: null}
            return {label: val.name, value: val.id }
        },
        module_typesManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map(item => ({
                label: item.name,
                id: item.id
            }))
        },
        methodsManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.name)
        },
        methodsOneListFormatter(val) {
            if (!val) return {label: null, value: null}
            return {label: val.name, value: val.id }
        },
        methodsManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map(item => ({
                label: item.name,
                id: item.id
            }))
        },
        targetsManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.name)
        },
        targetsOneListFormatter(val) {
            if (!val) return {label: null, value: null}
            return {label: val.name, value: val.id }
        },
        targetsManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map(item => ({
                label: item.name,
                id: item.id
            }))
        },
        usersManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.email)
        },
        usersOneListFormatter(val) {
            if (!val) return {label: null, value: null}
            return {label: val.email, value: val.id }
        },
        usersNameOptionsListFormatter(val) {
            if (!val) return {label: null, value: null}
            return {label: val.firstName + ' ' + (val.lastName ? val.lastName : '') + ' - ' + val.email, value: val.id }
        },
        usersNameFormatter(val) {
            if (!val) return {label: null, value: null}
            return {label: (val.firstName ? val.firstName : '') + ' ' + (val.lastName ? val.lastName : ''), value: val.id }
        },
        usersManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map(item => ({
                label: item.email,
                id: item.id
            }))
        },
        
}
