<script lang="ts">
  import { _ } from 'svelte-i18n';

  import {
    iconDeleteMajor,
    iconDuplicateRecord,
    iconLinkToRecordPage,
    iconModalRecordView,
  } from '@mathesar/icons';
  import { getTabularDataStoreFromContext } from '@mathesar/stores/table-data';
  import { modalRecordViewContext } from '@mathesar/systems/record-view-modal/modalRecordViewContext';
  import { takeFirstAndOnly } from '@mathesar/utils/iterUtils';

  import {
    deleteRecords,
    duplicateRecord,
    getRecordPageUrl,
    viewRecordInModal,
  } from './rowActions';

  export let rowIds: Set<string>;
  export let tabularData = getTabularDataStoreFromContext();

  const modalRecordView = modalRecordViewContext.get();

  $: ({ canInsertRecords, canDeleteRecords, canViewLinkedEntities } =
    $tabularData);

  $: selectedRowCount = rowIds.size;
  $: singleRowId = takeFirstAndOnly(rowIds);
  $: recordId = singleRowId
    ? $tabularData.getRecordIdFromRowId(singleRowId)
    : undefined;

  $: duplicateAction = {
    label: $_('duplicate_record'),
    icon: iconDuplicateRecord,
    disabled: !$canInsertRecords || !singleRowId,
    hidden: !singleRowId, // Currently only supporting single record duplication
    handler: () => {
      if (singleRowId) {
        duplicateRecord($tabularData, singleRowId);
      }
    },
  };

  $: deleteAction = {
    label: $_('delete_records', { values: { count: selectedRowCount } }),
    icon: iconDeleteMajor,
    disabled: !$canDeleteRecords,
    hidden: false,
    handler: () => {
      deleteRecords($tabularData, [...rowIds]);
    },
  };

  $: viewInModalAction = {
    label: $_('quick_view_record'),
    icon: iconModalRecordView,
    disabled: !$canViewLinkedEntities,
    hidden: !recordId,
    handler: () => {
      viewRecordInModal($tabularData, recordId, modalRecordView);
    },
  };

  $: recordPageUrl = getRecordPageUrl($tabularData, recordId);
  $: openPageAction = {
    label: $_('open_record'),
    icon: iconLinkToRecordPage,
    disabled: !recordPageUrl,
    hidden: !recordPageUrl,
    href: recordPageUrl,
  };

  $: actions = {
    duplicate: duplicateAction,
    delete: deleteAction,
    viewInModal: viewInModalAction,
    openPage: openPageAction,
  };
</script>

<slot {actions} />
