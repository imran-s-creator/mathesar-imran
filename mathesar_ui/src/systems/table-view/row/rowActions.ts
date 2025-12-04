import { get } from 'svelte/store';
import { _ } from 'svelte-i18n';

import { confirm, confirmDelete } from '@mathesar/stores/confirmation';
import { storeToGetRecordPageUrl } from '@mathesar/stores/storeBasedUrls';
import type { TabularData } from '@mathesar/stores/table-data';
import { currentTablesMap } from '@mathesar/stores/tables';
import { toast } from '@mathesar/stores/toast';
import RecordStore from '@mathesar/systems/record-view/RecordStore';
import type { ModalController } from '@mathesar-component-library';

export function duplicateRecord(
  tabularData: TabularData,
  rowId: string
) {
  const canInsertRecords = get(tabularData.canInsertRecords);
  if (!canInsertRecords) return;

  const rows = get(tabularData.recordsData.selectableRowsMap);
  const row = rows.get(rowId);
  
  if (!row) return;
  void tabularData.recordsData.duplicateRecord(row);
}

export function deleteRecords(
  tabularData: TabularData,
  rowIds: string[]
) {
  const canDeleteRecords = get(tabularData.canDeleteRecords);
  if (!canDeleteRecords) return;

  void confirmDelete({
    identifierType: get(_)('multiple_records', {
      values: { count: rowIds.length },
    }),
    body: [
      get(_)('deleted_records_cannot_be_recovered', {
        values: { count: rowIds.length },
      }),
      get(_)('are_you_sure_to_proceed'),
    ],
    onProceed: () => tabularData.recordsData.deleteSelected(new Set(rowIds)),
    onError: (e) => toast.fromError(e),
    onSuccess: (count) => {
      toast.success({
        title: get(_)('count_records_deleted_successfully', {
          values: { count },
        }),
      });
    },
  });
}

export function viewRecordInModal(
  tabularData: TabularData,
  recordId: unknown,
  modalRecordView: ModalController<RecordStore> | undefined
) {
  if (recordId === undefined || !modalRecordView) return;
  
  const canViewLinkedEntities = get(tabularData.canViewLinkedEntities);
  if (!canViewLinkedEntities) return;

  const containingTable = get(currentTablesMap).get(tabularData.table.oid);
  if (!containingTable) return;

  const recordStore = new RecordStore({
    table: containingTable,
    recordPk: String(recordId),
  });
  modalRecordView.open(recordStore);
}

export function getRecordPageUrl(
  tabularData: TabularData,
  recordId: unknown
): string | undefined {
  if (recordId === undefined) return undefined;
  
  const getUrl = get(storeToGetRecordPageUrl);
  return getUrl({
    tableId: tabularData.table.oid,
    recordId,
  });
}
