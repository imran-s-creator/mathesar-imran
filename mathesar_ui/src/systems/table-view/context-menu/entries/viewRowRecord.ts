import { get } from 'svelte/store';
import { _ } from 'svelte-i18n';

import { iconLinkToRecordPage, iconModalRecordView } from '@mathesar/icons';
import type { TabularData } from '@mathesar/stores/table-data';
import type RecordStore from '@mathesar/systems/record-view/RecordStore';
import {
  getRecordPageUrl,
  viewRecordInModal,
} from '@mathesar/systems/table-view/row/rowActions';
import {
  type ModalController,
  buttonMenuEntry,
  hyperlinkMenuEntry,
} from '@mathesar-component-library';

export function* viewRowRecord(p: {
  recordId: unknown;
  tabularData: TabularData;
  modalRecordView: ModalController<RecordStore> | undefined;
}) {
  if (p.recordId === undefined) return;
  const canViewLinkedEntities = get(p.tabularData.canViewLinkedEntities);
  if (!canViewLinkedEntities) return;

  yield buttonMenuEntry({
    label: get(_)('quick_view_record'),
    icon: iconModalRecordView,
    onClick: () => {
      viewRecordInModal(p.tabularData, p.recordId, p.modalRecordView);
    },
  });

  const recordPageUrl = getRecordPageUrl(p.tabularData, p.recordId);
  if (!recordPageUrl) return;

  yield hyperlinkMenuEntry({
    icon: iconLinkToRecordPage,
    label: get(_)('open_record'),
    href: recordPageUrl,
  });
}
